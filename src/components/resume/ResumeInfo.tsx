import React, { useEffect } from 'react'
import { StarOutlined } from '@ant-design/icons'
import { history } from 'umi'
import { message, Tag, Card, Row, Col, Button } from 'antd'
import { replaceEnter } from '../common/Common'
import FormMessage from '../common/FormMessage'

const ResumeInfo = ({
  resume,
  userinfo,
  from = 'list',
  fav = false,
  send = false,
  favLoading = true,
  sendLoading = true,
  favResume,
  error,
  goLogin,
}) => {
  useEffect(() => {
    replaceEnter(resume.introduce || '无（未填）', '#introduce')
  }, [])

  const favResumeCard = () => (
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
            onClick={favResume}
          >
            {fav ? '　已收藏' : '收藏简历'}
          </Button>
        </Col>
      </Row>
    </Card>
  )

  return (
    <Card
      size="default"
      title={
        <>
          {resume.gender != '2' && (
            <span style={{ color: '#0081ff' }}>{resume.name} 先生</span>
          )}
          {resume.gender == '2' && (
            <span style={{ color: 'purple' }}>{resume.name} 女士</span>
          )}
        </>
      }
      headStyle={{ color: '#0081ff' }}
      bordered={false}
    >
      {favResumeCard()}
      {(userinfo.resume == resume.id || from == 'audit') && (
        <Card size="small" bordered={false} title="审核信息" type="inner">
          <Row gutter={[6, 6]}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Row>
                <Col>
                  <Tag color="volcano">审核状态</Tag>
                </Col>
                <Col>
                  {resume.audit == '0' && <Tag color="#FF8C00">待审核</Tag>}
                  {resume.audit == '1' && <Tag color="#00BFFF">审核通过</Tag>}
                  {resume.audit == '2' && <Tag color="#FF0000">审核未通过</Tag>}
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              {resume.auditAt && (
                <Row>
                  <Col>
                    <Tag color="volcano">审核时间</Tag>
                  </Col>
                  <Col>{resume.auditAt}</Col>
                </Row>
              )}
            </Col>
            {resume.audit == '2' && (
              <Col span={24}>
                <Row>
                  <Col>
                    <Tag color="volcano">驳回原因</Tag>
                  </Col>
                  <Col>{resume.auditReason || '无'}</Col>
                </Row>
              </Col>
            )}
          </Row>
        </Card>
      )}

      <Card size="small" bordered={false} title="个人简介" type="inner">
        <Row gutter={[6, 6]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="orange">经　　验</Tag>
              </Col>
              <Col>
                {resume.experience.sort === 1
                  ? '无（未填）'
                  : resume.experience.name}
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="orange">学　　历</Tag>
              </Col>
              <Col>
                {resume.educational.sort === 1
                  ? '无（未填）'
                  : resume.educational.name}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="orange">专　　业</Tag>
              </Col>
              <Col>{resume.profession || '无（未填）'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card size="small" bordered={false} title="联系方式" type="inner">
        <Row gutter={[6, 6]}>
          <Col span={24}>（求职者投递您企业的职位后，才可查看联系方式）</Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Row>
              <Col>
                <Tag color="blue">联系电话</Tag>
              </Col>
              {(send || userinfo.resume == resume.id || from == 'audit') && (
                <Col>{resume.tel}</Col>
              )}
              {!send && userinfo.resume != resume.id && from != 'audit' && (
                <Col>求职者投递您的职位后，您才可查看</Col>
              )}
            </Row>
          </Col>
        </Row>
      </Card>

      <Card size="small" bordered={false} title="自我介绍" type="inner">
        <span id="introduce"></span>
      </Card>

      <Card size="small" bordered={false} title="期望职位" type="inner">
        {resume.categories.length != 0
          ? resume.categories.map((category, i, item) => {
              if (i + 1 === item.length) {
                return <span>{category.name}</span>
              } else {
                return <span>{category.name}、</span>
              }
            })
          : '（未填）'}
      </Card>

      <Card size="small" bordered={false} title="优点特长" type="inner">
        {resume.strongs.length != 0
          ? resume.strongs.map((strong, i, item) => {
              if (i + 1 === item.length) {
                return <span>{strong.name}</span>
              } else {
                return <span>{strong.name}、</span>
              }
            })
          : '（未填）'}
      </Card>

      <Card size="small" bordered={false} title="其他" type="inner">
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Row>
              <Col>
                <Tag color="green">更新时间</Tag>
              </Col>
              <Col>{resume.updateAt || '无'}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
      {favResumeCard()}
    </Card>
  )
}

export default ResumeInfo
