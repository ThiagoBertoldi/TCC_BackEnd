import { Request, Response } from "express";
import { GetComponentsBoardService } from "../../Service/Board/GetBoardComponentsService";

class GetComponentsController {
   async handle(req: Request, res: Response) {
      const { idBoard } = req.query

      let service = new GetComponentsBoardService()

      let components = await service.execute({ idBoard: idBoard as string })
     
      return res.json(components)
   }
}

export { GetComponentsController }