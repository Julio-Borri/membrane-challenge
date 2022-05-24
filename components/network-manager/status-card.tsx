// UI Components
import { Button, Card, Typography, Space } from 'antd';

const { Text } = Typography;


interface StatusCardProps {
  cardTitle: string;
  buttonLabel: string;
  successCondition: boolean;
  successText: string;
  handler: () => void;
  disableButton?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  cardTitle,
  buttonLabel,
  successCondition,
  successText,
  handler,
  disableButton
}) => {
  return (
    <Card title={cardTitle}>
      <Space>
        {successCondition && (
          <Text>
            {successText}
          </Text>
        )}
        
        {!successCondition && (
          <Button
            onClick={handler}
            disabled={disableButton}
            block
          >
            {buttonLabel}
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default StatusCard;
