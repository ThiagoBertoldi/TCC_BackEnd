import { Request, Response } from "express";
import { DeleteBoardService } from "../../Service/Board/DeleteBoardService";

class DeleteBoardController {
   async handle(req: Request, res: Response) {
      const { idBoard } = req.body

      let service = new DeleteBoardService()

      let board = await service.execute({ idBoard })

      return res.json(board)
   }
}

export { DeleteBoardController }