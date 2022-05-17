import axios from "axios";

const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "algoimg",
  user: "ipfs",
  password: "ipfs",
  ssl: false,
};
// create table data(assetid int, file text);

const db = pgp(cn);

interface ImageResponse {
  asset: {
    params: {
      url: string;
    };
  };
}

export function ipfsToUrl(ipfsUrl: string): string {
  if (ipfsUrl.includes("ipfs://")) {
    return ipfsUrl.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
    //https://gateway.pinata.cloud/ipfs/QmVxZFeLHtbrdtFabb46ToSvegpKyva1jzTkR61a8uM7qT
  } else if (ipfsUrl.includes("gateway.pinata.cloud/ipfs")) {
    return ipfsUrl.replace("gateway.pinata.cloud/ipfs/", "cloudflare-ipfs.com/ipfs/");
  } else if (ipfsUrl.includes("ipfs.io")) {
    return ipfsUrl.replace("ipfs.io", "cloudflare-ipfs.com");
  }
  return ipfsUrl;
}

export async function getImageUrl(assetId: number): Promise<string> {
  console.log(`https://algoindexer.algoexplorerapi.io/v2/assets/${assetId}`);
  const data = await axios.get<ImageResponse>(`https://algoindexer.algoexplorerapi.io/v2/assets/${assetId}`);
  const url = ipfsToUrl(data.data.asset.params.url);
  return url;
}

export async function getContentType(url: string): Promise<string> {
  const response = await axios.head(url);
  console.log(response.headers["content-type"]);
  return response.headers["content-type"];
}

// Function to get filename with assetid
export async function getFileName(assetId: number): Promise<string | boolean> {
  try {
    const data = await db.one(`SELECT file FROM data WHERE assetid = $1`, [assetId]);
    return data.file;
  } catch (e) {
    return false;
  }
}

export async function writeToDb(assetId: number, file: string): Promise<void> {
  await db.none(`INSERT INTO data (assetid, file) VALUES ($1, $2)`, [assetId, file]);
}
