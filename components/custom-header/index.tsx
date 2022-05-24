// UI Components
import { PageHeader } from 'antd';

// Assets
import { wording  } from '../../utils/constants';


const CustomHeader: React.FC = () => {
  const { PAGE_TITLE, PAGE_SUBTITLE } = wording;

  return (
    <PageHeader
      className="header-container"
      title={PAGE_TITLE}
    />
  );
};

export default CustomHeader;
