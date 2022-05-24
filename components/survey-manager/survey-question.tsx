// UI Components
import { Form, Avatar, Space, Radio, Typography } from 'antd';

// Assets
import { SurveyQuestion } from '../../state/interfaces';

const { Text } = Typography;


const SurveyQuestion: React.FC<SurveyQuestion> = ({
  text,
  image,
  lifetimeSeconds,
  options
}) => {
  return (
    <Form.Item
      name={text}
      label={(
        <Space direction="horizontal">
          <Avatar
            src={image}
            size={32}
          />
          <Text>{text}</Text>
        </Space>
      )}
    >
      <Radio.Group>
        <Space direction="vertical">
          {options.map(({ text }) => (
            <Radio value={text} key={text}>{text}</Radio>
          ))}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
};

export default SurveyQuestion;
