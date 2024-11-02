import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUBAv/EADoQAAICAQIDBAcECQUAAAAAAAABAgMEBREGITESQVFhE0JxgbHB0SJSkaEUJCUycpKiwuEVIzRDYv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AtIAGmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5utt30OZlcQ6VjScZZUZyXJqtOe34BXUBxqeJ9JtkovIlDzsraX4nWqtrvrVlM42QfSUHumB9gAIAAAAAAAAAAAAAAAAAAAY8nIrxced981CuC3lJ9xkIVxpqLuy44NcmqqtnNrvk/oviwNDW9eydUm4JurF9WtPr5y8fYcgAuIG3p2o5Wm3ekxLOy/Wi/3Ze1GoARZmjarVquL6Wv7NkeVlffB/Q3ytND1CWm6hXem3W/s2x7nF9fw6llJqSTi90+jIr0AAAAAAAAAAAAAAAAAAN9uZVGTdLJybb5Nt2TcufmWrNdqEl4xZUyWy2AAA0gABSBZPDl8snQ8ScnvJQ7L38m18itiwuEYuOgUecpv+pmVdkAAAAAAAAAAAAAAAAAAEVfquO8TUsmhrZQse3s6r8mWgRTjTSpWKOoUR3cV2bkuu3dL6gQ8DYGkAARQs/R8f9E0rFofKUa1v7er+JCuGNKlqGfGyyP6tTLtTb9Z90fqWCQAAAAAAAAAAAAAAAAAAAPGt013M9AEZ1XhKm+bs0+xUSfN1SW8fd4HBu4Z1auTSxlYvGuaf+Sw5SUY9qT2j4t7I1LNV06p9mzOx0/D0iAgkOHdXm/8AhSj/ABSil8TrafwfY5RlqN8YQ74Vc2/e+RI4axpkntHPxt/40bdVtd0e1TZGa8YST+AHzjY9OLTGjHrVdUekUZQAAAAAAAAAAAAAAAAAAByte1mrSaOnbyJp+jr+b8gNzPzsbAp9LlWqEe5d79iIlqPF2TdvHAgqIffn9qT+SODmZd+dkO/Ksdk349EvBeBgAy5OTkZU+3k3Ttf/ALluYvZ0ALiB7XOVU1OqThJdJRez/I8AwdzT+J9QxWldNZNf3bP3v5iWaTreJqi2qk4W7c6p9fd4lbnsJShOM4NxlHmpJ7NMLFtAjXDfEf6W44ee9r3yhb3T8n5klIAAAAAAAAAAAAADU1TPq03CsybefZ5Rh95voitczKtzcmeRfLtWTfN/BLyOzxhqDytReNCX+1jcuXrS738jgAAAVAAFAAAAAAXJrbf3E/4W1j/UsV03y/WaUu0/vruf1IAbWmZs9PzqsqHqP7S8Y96Iq0QfNc42Vxsg94SScX5PofRAAAAAAAAAMGdkLEw78iXSqDl+HT8zOcXjC116Dcl/2ThD3b7/ACAr+UpTk5ze8pPds8ALEoACgAAAAAAAAACKn3B+U8jSI1ye8qJOD9nVfE7pDuArX6bNp7nCM17m180TEgAAAAAAAAEe44f7IrXjfH4MACCgAsZAAVQAAAAAAAAAASPgV/tW9eNH9yJwARYAAgAAD//Z"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }

},{timestamps:true});

const User = mongoose.model("User",userModel);
export default User;
