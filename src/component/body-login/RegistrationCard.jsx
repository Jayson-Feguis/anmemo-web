import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  message,
} from "antd";
import "antd/dist/antd.min.css";
import useStyles from "./style";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { actions, registerAction } from "../../redux/action/user/actions";

const account_type = [
  {
    id: 1,
    label: "Administrator",
  },
  {
    id: 2,
    label: "Secretary",
  },
  {
    id: 3,
    label: "Faculty Member",
  },
];

function RegistrationCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const user = useSelector((state) => state.user);
  const [departmentList, setDepartmentList] = useState(null);
  const [isClick, setClick] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(registerAction(actions.REGISTER_REQUEST, values));
    setClick(true);
  };

  const onFinishFailed = (errorInfo) => {
    message.error("There's something went wrong! Check your inputs.");
  };

  useEffect(() => {
    if (!_.isNil(department.data)) {
      setDepartmentList(department.data?.result);
    }
    if (!_.isNil(user.data)) {
      if (!_.isNil(user.success_msg) && isClick) {
        message.success(user.success_msg.message);
        form.resetFields();
      }
    } else {
      if (!_.isNil(user.error_msg) && isClick) {
        message.error(user.error_msg);
      }
      if (!_.isNil(user.success_msg) && isClick) {
        message.success(user.success_msg.message);

        form.resetFields();
      }
    }
  }, [department, user]);

  const filteredDept = department?.data?.result.filter(
    (dept) => dept.DEPT_STATUS !== 2
  );

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        width: "100%",
      }}
      initialValues={{
        remember: true,
        department: 1,
      }}
    >
      <Row>
        <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 8 }} layout="vertical">
              <Form.Item
                label="First Name"
                name="firstname"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                  {
                    pattern: /^[a-zA-Z]*$/,
                    message: "First name should have no number.",
                  },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Form.Item
                label="Middle Name"
                name="middlename"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your middle name!",
                  },
                  {
                    pattern: /^[a-zA-Z]*$/,
                    message: "Middle name should have no number.",
                  },
                ]}
              >
                <Input placeholder="Enter your middle name" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Form.Item
                label="Last Name"
                name="lastname"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                  {
                    pattern: /^[a-zA-Z]*$/,
                    message: "Last name should have no number.",
                  },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Username"
                name="username"
                labelCol={{
                  span: 24,
                  //offset: 2
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please enter your username!",
                  },
                  { min: 3 },
                  { max: 26 },
                ]}
              >
                <Input placeholder="Enter your username" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{
                  span: 24,
                  //offset: 2
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please enter your email!",
                  },
                  { min: 7 },
                  { max: 30 },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Birth Date"
                name="birthdate"
                labelCol={{
                  span: 24,
                  //offset: 2
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please enter your birth date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Password"
                name="password"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { whitespace: true },
                  { min: 8 },
                  { max: 26 },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/,
                    message:
                      "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
                  },
                ]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                labelCol={{
                  span: 24,
                  //offset: 2
                }}
                wrapperCol={{
                  span: 24,
                  //offset: 2
                }}
                hasFeedback
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject("Passwords does not matched.");
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Form.Item
                label="Gender"
                name="gender"
                labelCol={{
                  span: 24,
                  //offset: 2
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <Radio.Group style={{ width: "100%" }}>
                  <Radio value="male">Male</Radio>
                  <Radio value="memale">Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Department"
                name="department"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your department!",
                  },
                ]}
              >
                <Select placeholder="Select your department">
                  {filteredDept === null
                    ? null
                    : filteredDept?.map((value, index) => (
                        <Select.Option key={index} value={value.DEPT_ID}>
                          {value.DEPT_NAME}
                        </Select.Option>
                      ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Account Type"
                name="accounttype"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your account type!",
                  },
                ]}
              >
                <Select placeholder="Select your account type">
                  {account_type.map((value, index) => (
                    <Select.Option key={index} value={value.id}>
                      {value.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
      </Row>
    </Form>
  );
}

export default RegistrationCard;
