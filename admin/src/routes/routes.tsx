import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";


export const basePath = '/wp-admin/admin.php';

const Routes = [
    { path:'/', element:<Layout /> }
];

const router = createBrowserRouter([...Routes], { basename:basePath });

export default router;