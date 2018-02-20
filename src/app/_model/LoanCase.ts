export interface LoanCase {
    _id: string;
    idNumber: string;
    name: string;
    status: string;
    // bookingUser: string;
    // createDate: string;
    // createUser: string;
    // modifyDate: string;
    // modifyUser: string;
}

export const LOANCASES: LoanCase[] = [
    {
        _id: '21332ragdfvsdf',
        name: 'teset',
        idNumber: '1234',
        status: 'new',
    },
    {
        _id: '123123adafsdf',
        name: 'teset2',
        idNumber: '45678',
        status: 'finished',
    },


];
