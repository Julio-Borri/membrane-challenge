// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../../state/reducers';

// UI Components
import { Button, Typography, Card, Statistic, Space } from 'antd';

// Assets
import { wording } from '../../../utils/constants';

const { Title } = Typography;


interface SurveyPreviewProps {
  handleSubmitSurvey: () => Promise<void>;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ handleSubmitSurvey }) => {
  const { state } = useContext(AppContext);

  const { answers } = state;
  const { SURVEY_PREVIEW, SUBMIT_SURVEY } = wording;

  return (
    <div>
      <Space className="preview-container">
        <Title level={3}>{SURVEY_PREVIEW}</Title>
        <Button onClick={handleSubmitSurvey}>
          {SUBMIT_SURVEY}
        </Button>
      </Space>

      {Object.keys(answers).map((title) => (
        <Card size="small" key={title}>
          <Statistic title={title} value={`Option: ${answers[title]}`} />
        </Card>
      ))}
    </div>
  );
};

export default SurveyPreview;
