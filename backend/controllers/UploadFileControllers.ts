import express from 'express'



class UploadFileController {
  async index(req: express.Request, res: express.Response):Promise<void> {
   console.log(req.file)
  } 

}

export const UploadFileCrtl = new UploadFileController()