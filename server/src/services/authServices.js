import { connDB } from "../databases/connectDB.js";

export const signIn = async(info)=>{
  let db = await connDB();
  let collection = db.collection("users");

  let user = await collection.aggregate([
    {
      $match: {
        username: info.username,
        password: info.password
      }
    },
    {
      $project:{
        password: 0
      }
    }
  ]).toArray()

  return user;
}

export const singUp = async(info)=>{
  let db = await connDB();
  let collection = db.collection("users");

  let user = await collection.findOne({$or: [{ username: info.username }, { email: info.email }]});

  if(user){
    return false;
  }else{
    await collection.insertOne(info)
    let data = await collection.aggregate([
      {
        $match: {
          username: info.username,
          password: info.password
        }
      },
      {
        $project:{
          password: 0
        }
      }
    ]).toArray();
    return data;
  }
}