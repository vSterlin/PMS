import styled, {keyframes} from "styled-components"
const Card = styled.div`
  width: 50%;
  border-bottom: 1px grey solid;
  margin: 0 auto;
  padding: 10px;
  color: #6a6a6a;
  & > * {
    margin: 10px 0;
  }
`;

const colorAnim = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

const LoadingHeading = styled.div`
  background-color: grey;
  width: 50%;
  height: 1rem;
  animation: 0.5s ${colorAnim} alternate infinite;
`;

const LoadingDescription = styled.div`
  background-color: grey;
  width: 90%;
  height: 1rem;
  animation: 0.5s ${colorAnim} alternate infinite;
  animation-delay: 0.1s;
`;

const LoadingLink = styled.div`
  background-color: grey;
  width: 10%;
  height: 1rem;
  animation: 0.5s ${colorAnim} alternate infinite;
  animation-delay: 0.2s;
`;

const buildLoading = () => {
  const arr = [];
  for(let i=0;i<6;i++){
    arr.push(
      <Card>
      <LoadingHeading />
      <LoadingDescription />
      <LoadingLink />
    </Card>
    )
  }
  return arr;
}

const Loading = () => {
  return (
    <div>
      {buildLoading()}
    </div>
  )
}

export default Loading
