

export default interface IFormRepository {
    getAllForm(): Promise<any[]>;
    getFormById(id: number): Promise<any>;
    createForm(data: any): Promise<boolean>;
    editForm(data: any): Promise<boolean>;
    deleteForm(id: number): Promise<boolean>;
}

