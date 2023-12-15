import { FacebookProvider, Like } from 'react-facebook';

export default function FacebookLike({hrefData}) {
    return (
        <FacebookProvider appId="1327700631346413">
            <Like href={hrefData} colorScheme="dark" showFaces share />
        </FacebookProvider>
    );
}