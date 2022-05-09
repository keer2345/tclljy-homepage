import React, { useEffect } from 'react'
import { message, Tag, Card, Row, Col, Button } from 'antd'
import { CrownOutlined, SendOutlined, StarOutlined } from '@ant-design/icons'
import FormMessage from '../common/FormMessage'
import { history } from 'umi'
import { replaceEnter } from '../common/Common'

const JobInfo = ({
  job,
  userinfo,
  from = 'list',
  fav = false, //是否被你收藏
  send = false, //是否被你投递
  favLoading = true,
  sendLoading = true,
  favJob,
  sendJob,
  error,
  goLogin,
}) => {
  useEffect(() => {
    // const desc = job.description.replace(/\n/g, '<br />')
    // const span = document.querySelector('#description')
    // span.innerHTML = desc
    replaceEnter(job.description, '#description')
  }, [])

  const favAndSend = () => (
    <Card size="small" bordered={false} type="inner">
      <Row justify="end" gutter={[6, 6]}>
        {error && (
          <Col>
            <FormMessage content={error || '操作失败'} />
          </Col>
        )}
        {error && !userinfo.id && (
          <Col>
            <Button type="link" onClick={goLogin}>
              登录
            </Button>
            或
            <Button type="link" onClick={() => history.push('/user/register')}>
              注册
            </Button>
          </Col>
        )}
        {/* 有错误信息、已登录、未发布简历、不是自己企业发布的职位 */}
        {error &&
          userinfo.id &&
          (!userinfo.resume || userinfo.resume == '0') &&
          userinfo.firm != job.firm.id && (
            <Col>
              <Button
                type="link"
                onClick={() => {
                  history.push('/resume/add')
                }}
              >
                发布简历
              </Button>
            </Col>
          )}
        <Col>
          <Button
            type="primary"
            shape="round"
            icon={<StarOutlined />}
            size="middle"
            style={
              fav
                ? { backgroundColor: '#ef5b9c', borderColor: '#ef5b9c' }
                : { backgroundColor: '#f47920', borderColor: '#f47920' }
            }
            loading={favLoading}
            onClick={favJob}
          >
            {fav ? '　已收藏' : '收藏职位'}
          </Button>
        </Col>
        <Col></Col>
        <Col>
          <Button
            type="primary"
            shape="round"
            icon={<SendOutlined />}
            size="middle"
            style={
              send ? { backgroundColor: '#ed1941', borderColor: '#ed1941' } : {}
            }
            loading={sendLoading}
            onClick={sendJob}
          >
            {send ? '　已投递' : '投递职位'}
          </Button>
        </Col>
      </Row>
    </Card>
  )

  return (
    <Card
      size="default"
      title={job.name}
      extra={
        <span className="extra">
          {job.mianyi
            ? '待遇面议'
            : job.minSalary + ' ~ ' + job.maxSalary + ' 元'}
        </span>
      }
      headStyle={{
        color: '#0081ff',
      }}
      bordered={false}
    >
      {favAndSend()}
      <Card size="small" bordered={false} title="所属企业" type="inner">
        <Button size="large" type="link">
          {job.firm.name}
        </Button>
        <Tag color="green" icon={<CrownOutlined />}>
          已认证
        </Tag>
      </Card>
      {(userinfo.firm == job.firm.id || from == 'audit') && (
        <Card size="small" bordered={false} title="审核信息" type="inner">
          <Row gutter={[6, 6]}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Row>
                <Col>
                  <Tag color="volcano">审核状态</Tag>
                </Col>
                <Col>
                  {job.audit == '0' && <Tag color="#FF8C00">待审核</Tag>}
                  {job.audit == '1' && <Tag color="#00BFFF">审核通过</Tag>}
                  {job.audit == '2' && <Tag color="#FF0000">审核未通过</Tag>}
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              {job.auditAt && (
                <Row>
                  <Col>
                    <Tag color="volcano">审核时间</Tag>
                  </Col>
                  <Col>{job.auditAt}</Col>
                </Row>
              )}
            </Col>
            {job.audit == '2' && (
              <Col span={24}>
                <Row>
                  <Col>
                    <Tag color="volcano">驳回原因</Tag>
                  </Col>
                  <Col>{job.auditReason || '无'}</Col>
                </Row>
              </Col>
            )}
          </Row>
        </Card>
      )}
      <Card size="small" bordered={false} title="职位信息" type="inner">
        <Row gutter={[6, 6]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="purple">工种形式</Tag>
              </Col>
              <Col>{job.jobType.name}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="purple">职位类别</Tag>
              </Col>
              <Col>{job.jobCategory.name}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card size="small" bordered={false} title="职位描述" type="inner">
        <span id="description"></span>
      </Card>

      <Card size="small" bordered={false} title="联系方式" type="inner">
        <Row gutter={[6, 6]}>
          <Col span={24}>（投递职位后，可查看联系方式）</Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">联&nbsp;&nbsp;系&nbsp;&nbsp;人</Tag>
              </Col>
              <Col>{job.firm.contactPerson}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">联系电话</Tag>
              </Col>
              {(send || userinfo.firm == job.firm.id || from == 'audit') && (
                <Col>{job.firm.contactTel}</Col>
              )}
              {!send && userinfo.firm != job.firm.id && from != 'audit' && (
                <Col>
                  <Button
                    type="link"
                    size="small"
                    icon={<SendOutlined />}
                    onClick={sendJob}
                  >
                    投递后可查看
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="blue">所在地区</Tag>
              </Col>
              {!job.firm.region && (
                <Col>
                  {job.firm.province.name}·{job.firm.city.name}
                </Col>
              )}
              {job.firm.region && (
                <Col>
                  {job.firm.province.name}·{job.firm.city.name}·
                  {job.firm.region.name}
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="blue">详细地址</Tag>
              </Col>
              <Col>{job.firm.address || '（未填写）'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card size="small" bordered={false} title="职位要求" type="inner">
        <Row gutter={[6, 6]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="orange">经验要求</Tag>
              </Col>
              <Col>
                {job.experience.sort === 1 ? '经验不限' : job.experience.name}
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="orange">学历要求</Tag>
              </Col>
              <Col>
                {job.educational.sort === 1 ? '学历不限' : job.educational.name}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="orange">专业要求</Tag>
              </Col>
              <Col>{job.profession || '无'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card size="small" bordered={false} title="其他信息" type="inner">
        <Row gutter={[6, 6]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="cyan">发薪日期</Tag>
              </Col>
              <Col>{job.faxinri || '（未填）'}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="cyan">平均工作时长</Tag>
              </Col>
              <Col>{job.workHours || '（未填）'}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="cyan">员工福利</Tag>
              </Col>
              <Col>{job.weal || '（未填）'}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="cyan">职位亮点</Tag>
              </Col>
              <Col>{job.zwld || '（未填）'}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="cyan">有无吃住</Tag>
              </Col>
              <Col>{job.chizhu || '（未填）'}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="cyan">工作时间</Tag>
              </Col>
              <Col>{job.workTime || '（未填）'}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="cyan">入职所需费用</Tag>
              </Col>
              <Col>{job.feiyong || '（未填）'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card size="small" bordered={false} title="其他" type="inner">
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="green">更新时间</Tag>
              </Col>
              <Col>{job.updateAt || '无'}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="green">浏览人数</Tag>
              </Col>
              <Col>{job.see || '0'}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="green">收藏人数</Tag>
              </Col>
              <Col>{job.fav || '0'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {favAndSend()}
    </Card>
  )
}

export default JobInfo
