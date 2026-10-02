import {json,auth} from '../_lib.js';export async function onRequestGet({request,env}){return auth(request,env)?json({ok:true}):json({error:'未登录'},401)}
