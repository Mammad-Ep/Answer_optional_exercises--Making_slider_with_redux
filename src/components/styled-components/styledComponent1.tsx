import styled from "styled-components";
// ___________________________________________________________

export const Img = styled.img<{ count: number, keyId: number }>`
    width: 100%;
    height: inherit;
    display:${(props) => props.count == props.keyId ? 'block' : 'none'}
`

