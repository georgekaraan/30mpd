//Class for ipfs sending
import { create } from "ipfs-http-client";
import { readFileSync } from "fs";

async function ipfsSaveFile(fileName) {


    const projectId = process.env.PROJECTID;   // <---------- your Infura Project ID

    const projectSecret = process.env.PROJECTAPI;

    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    })

    console.log(fileName);
    let data = readFileSync(fileName)

    let result = await client.add(data)
    return result.path
}


export default ipfsSaveFile;