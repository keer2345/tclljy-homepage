import React, { useEffect } from 'react'
import { message, Image, Tag, Card, Row, Col, Button } from 'antd'
import { CrownOutlined, SendOutlined, StarOutlined } from '@ant-design/icons'
import { replaceEnter } from '../common/Common'

const FirmInfo = ({ firm, userinfo, from = 'list', seeJobs = { seeJobs } }) => {
  useEffect(() => {
    replaceEnter(firm.remark, '#remark')
  }, [])
  return (
    <Card
      size="default"
      bordered={false}
      title={firm.name}
      headStyle={{
        color: '#0081ff',
      }}
    >
      {(from == 'admin' || from == 'audit') && (
        <Card size="small" bordered={false} title="审核信息" type="inner">
          <Row gutter={[6, 6]}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Row>
                <Col>
                  <Tag color="volcano">审核状态</Tag>
                </Col>
                <Col>
                  {firm.audit == '0' && <Tag color="#FF8C00">待审核</Tag>}
                  {firm.audit == '1' && <Tag color="#00BFFF">审核通过</Tag>}
                  {firm.audit == '2' && <Tag color="#FF0000">审核未通过</Tag>}
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              {firm.auditAt && (
                <Row>
                  <Col>
                    <Tag color="volcano">审核时间</Tag>
                  </Col>
                  <Col>{firm.auditAt}</Col>
                </Row>
              )}
            </Col>
            {firm.audit == '2' && (
              <Col span={24}>
                <Row>
                  <Col>
                    <Tag color="volcano">驳回原因</Tag>
                  </Col>
                  <Col>{firm.auditReason || '无'}</Col>
                </Row>
              </Col>
            )}
          </Row>
        </Card>
      )}

      <Card size="small" bordered={false} title="企业介绍" type="inner">
        <Row gutter={[6, 6]}>
          <Col xs={{ span: 24 }}>
            <span id="remark"></span>
          </Col>
        </Row>
      </Card>
      <Card size="small" bordered={false} title="联系方式" type="inner">
        <Row gutter={[6, 6]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">联&nbsp;&nbsp;系&nbsp;&nbsp;人</Tag>
              </Col>
              <Col>{firm.contactPerson}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">联系电话</Tag>
              </Col>
              {(userinfo.firm == firm.id || from == 'audit') && (
                <Col>{firm.contactTel}</Col>
              )}
              {userinfo.firm != firm.id && from != 'audit' && (
                <Col>
                  <Button
                    type="link"
                    size="small"
                    icon={<SendOutlined />}
                    onClick={seeJobs}
                  >
                    可在该启发发布的职位详情中查看
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">所在地区</Tag>
              </Col>
              {!firm.region && (
                <Col>
                  {firm.province.name} · {firm.city.name}
                </Col>
              )}
              {firm.region && (
                <Col>
                  {firm.province.name} · {firm.city.name} · {firm.region.name}
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">详细地址</Tag>
              </Col>
              <Col>{firm.address || '（未填写）'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card size="small" bordered={false} title="企业信息" type="inner">
        <Row gutter={[6, 6]}>
          {(from == 'admin' || from == 'audit') && (
            <Col span={24}>
              <Row>
                <Col>
                  <Tag color="cyan">信用代码</Tag>
                </Col>
                <Col>{firm.code}</Col>
              </Row>
            </Col>
          )}
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="cyan">企业性质</Tag>
              </Col>
              <Col>{firm.nature.name}</Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="cyan">企业规模</Tag>
              </Col>
              <Col>{firm.scale.name}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="cyan">所属行业</Tag>
              </Col>
              <Col>{firm.industry.name}</Col>
            </Row>
          </Col>
          {(from == 'admin' || from == 'audit') && (
            <>
              <Col span={24}>
                <Tag color="cyan">营业执照照片</Tag>
              </Col>
              <Col span={24}>
                {firm.codeImage && (
                  <Image
                    width={200}
                    src={
                      'http://www.tclljy.com/api/file/images/' + firm.codeImage
                    }
                  />
                )}
                {!firm.codeImage && '（未上传营业执照照片）'}
              </Col>
            </>
          )}
        </Row>
      </Card>

      <Card size="small" bordered={false} title="其他信息" type="inner">
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="green">更新时间</Tag>
              </Col>
              <Col>{firm.updateAt || '无'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Card>
  )
}

export default FirmInfo
