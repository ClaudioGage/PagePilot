export interface IRepository<T> {
    create(entity: T): T;
    findAll(): T[];
    findById(id: string): T | undefined;
    update(id: string, updateData: Partial<T>): T | undefined;
    delete(id: string): boolean;
  }