export const getTUMailFromName = (firstName: string, lastName: string, student: boolean =true) => {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${student ? 'stud': ''}.tu-darmstadt.de`;
};