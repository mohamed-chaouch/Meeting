'use server';

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

interface userProps {
    _id : string,
    username : string,
    imageUrl : string,
}

export const tokenProvider = async (user : userProps ) =>{

    if(!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("No API KEY");
    if(!apiSecret) throw new Error("No API secret");

    const streamClient = new StreamClient(apiKey, apiSecret);

    //expiration token after one hour
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;
    
    const token = streamClient.createToken(user._id, exp, issued);

    return token;
}
