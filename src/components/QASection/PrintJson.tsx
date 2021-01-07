import React from "react";
import styled from "styled-components";

interface Props {
  data: any;
}

const PrintJson = ({ data }: Props) => {
  const PrettyPrintJson = React.useMemo(
    () => (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    ),
    [data]
  );
  const [show, setShow] = React.useState(false);
  return (
    <Container>
      <button onClick={() => setShow(!show)}>Show Fetched JSON Data</button>
      <JsonData show={show}>{PrettyPrintJson}</JsonData>
    </Container>
  );
};

export default PrintJson;

const Container = styled.div`
  position: relative;
  height: 70px;
`;

const JsonData = styled.div<{ show: boolean }>`
  position: absolute;
  left: 0;
  top: 50px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: none;
`;
