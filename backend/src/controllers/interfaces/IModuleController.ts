import { RequestHandler } from "express";

export interface IModuleController {
 createModule:RequestHandler
 updateModule:RequestHandler
 deleteModule:RequestHandler
}