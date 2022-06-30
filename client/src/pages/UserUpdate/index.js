import classNames from "classnames/bind";
import { useState } from "react";
import styles from './UserUpdate.module.scss';
import * as createUser from '~/apiServices/createUserService';
const cx = classNames.bind(styles);
function UserUpdate()
{
    const [file, setFile] = useState();
    const [files, setFiles] = useState();

    const saveFile = (e) => {
        const img = e.target.files[0];
        setFile(img);
    };
    const uploadFile = async (e) => {

        const formData = new FormData();
        formData.append('file', file);
        const fetchApi = async ()=>{
            const result = await createUser.create(formData);
            console.log(result);
        }
        fetchApi();
      };


    const saveFiles = (e) => {
        const img = e.target.files;
        setFiles(img);
    };
    const uploadFiles = async (e) => {
        const formData = new FormData();
        for (const key of Object.keys(files)) {
            formData.append('file', files[key])
        }
        console.log(file);
        console.log(files);
        const fetchApi = async ()=>{
            const result = await createUser.create(formData);
            console.log(result);
        }
        fetchApi();
      };
   
    return  <div className={cx('UserUpdate')}>
                <h1>Insert user</h1>
                <input type="file"  onChange={saveFile} />
                <button onClick={uploadFile}>Upload</button>

                <div>
                    <input type="file" multiple onChange={saveFiles} />
                    <button onClick={uploadFiles}>Upload multiple</button>
                </div>
            </div>
}
export default UserUpdate