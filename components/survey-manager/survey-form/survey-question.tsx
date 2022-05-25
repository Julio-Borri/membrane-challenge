// Module dependencies
import type { RadioChangeEvent } from 'antd';

// UI Components
import { Form, Avatar, Space, Radio, Typography } from 'antd';

// Assets
import { SurveyQuestion } from '../../../state/interfaces';

const { Text } = Typography;


interface SurveyQuestionProps {
  question: SurveyQuestion;
  handleRadioChange: ({ target }: RadioChangeEvent) => void;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  question,
  handleRadioChange,
}) => {
  const { text, image, options} = question;

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
      <Radio.Group onChange={handleRadioChange} name={text}>
        <Space direction="vertical">
          {options.map(({ text }, index) => (
            <Radio value={index} key={text}>{text}</Radio>
          ))}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
};

export default SurveyQuestion;
