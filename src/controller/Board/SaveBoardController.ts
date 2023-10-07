import { Request, Response } from "express";
import { SaveBoardService } from "../../Service/Board/SaveBoardService";

class SaveBoardController {
   async handle(req: Request, res: Response) {
      const { components, idBoard } = req.body
      const idProfessor = req.user_id as string;

      let service = new SaveBoardService()

      let board = await service.execute({ components, idBoard, idProfessor })

      return res.json(board)
   }
}

export { SaveBoardController }