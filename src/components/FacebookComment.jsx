import { FacebookProvider, Comments } from 'react-facebook';

export default function FacebookComment({hrefData}) {
    return (
        <FacebookProvider appId="1327700631346413" >
            <Comments href={hrefData} width='100%'/>
        </FacebookProvider>
    );
}