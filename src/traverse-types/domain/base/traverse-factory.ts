import { Traverse } from ".";

export abstract class TraverseFactory{
    abstract createTraverse(): Traverse
}