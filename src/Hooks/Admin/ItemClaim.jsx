import { defaultAdminRequest } from "./Admin";

export const getDetailClaim = async({id})=>{
    return await defaultAdminRequest({url:"/Admin/Item-Claim/"+id,method:"get",body:""});
}
export const getListClaim = async ({page, status})=>{
    let url = "/Admin/Item-Claim?page="+page;
    if(status!=null) url = url+"&status="+status;
    return await defaultAdminRequest({url:url, method:"get",body:""});
}

export const getUrlReport = async({id})=>{
    let url = "/Admin/Item-Claim/"+id+"/report";
    return defaultAdminRequest({url:url, method:"get", body:""});
}

export const getCommetID = async (id)=>{
    return defaultAdminRequest({url:`Admin/Item-Comment?itemClaimId=${id}`, method:"get", body:{}});
}