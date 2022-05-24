// UI Components
import { Typography, Card, Row, Col } from 'antd';

const { Meta } = Card;

interface SurveyCardProps {
  title: string;
  imageUrl: string;
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  title,
  imageUrl
}) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={title} src={imageUrl} />}
    >
      <Meta title={title} description="Click to start survey" />
    </Card>
  );
};

export default SurveyCard;
