import { useSearchParams } from "react-router-dom";
import ListPage from "../ListPage/ListPage";
import { ReactElement } from "react";
import EditionPage from "../EditionPage/EditionPage";
import Navbar from "../../components/ui/Navbar/Navbar";

const Layout = () => {
    const [searchParams, setSearchParams ] = useSearchParams();
    let page: ReactElement|null = null;

    switch(searchParams.get('action')) {
        case 'list': page = <ListPage />; break;
        case 'edit': page = <EditionPage id={searchParams.get('formid')}/>; break;
        default: page = <ListPage />;
    }

    return <>
        <Navbar />
        { page }
    </>;
}

export default Layout;