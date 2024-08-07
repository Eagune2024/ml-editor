import styled from 'styled-components';

const RootPage = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;

  @media (max-width: 770px) {
    height: 100%;
    overflow: hidden;
  }
  @media print {
    @page {
      page-orientation: landscape;
    }
  }
`;

export default RootPage;
