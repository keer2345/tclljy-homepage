import { getRespToArrary, getUser } from '@/components/common/Common'
import React, { useEffect, useState } from 'react'
import { Link, history } from 'umi'
import { Row, Col, Card, message } from 'antd'
import ProCard from '@ant-design/pro-card'
import './index.css'
import { fetchFirm } from '@/services/firm'
import FirmInfo from '@/components/firm/FirmInfo'
import FirmForm from './FirmForm'

const MyFirm = () => {
  const [userinfo, setUserinfo] = useState({})
  const [firm, setFirm] = useState({})
  const [tag, setTag] = useState(1)
  const [editTitle, setEditTitle] = useState('')
  const [firmLoading, setFirmLoading] = useState(true)
  const [firmNature, setFirmNature] = useState([])
  const [firmScale, setFirmScale] = useState([])
  const [firmIndustry, setFirmIndustry] = useState([])
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [regions, setRegions] = useState([])
  const [areaLoading, setAreaLoading] = useState(true)

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }

  useEffect(() => {
    getRespToArrary('/api/firmNature', '加载企业性质失败', 1, {
      enable: 1,
    }).then((res) => setFirmNature(res))
    getRespToArrary('/api/firmScale', '加载企业规模失败', 1, {
      enable: 1,
    }).then((res) => setFirmScale(res))
    getRespToArrary('/api/firmIndustry', '加载企业所属行业失败', 1, {
      enable: 1,
    }).then((res) => setFirmIndustry(res))
    getRespToArrary('/api/area', '加载地区列表失败', 1, {
      enable: 1,
      level: 1,
      parentId: 0,
    }).then((res) => setProvinces(res))
  }, [])
  useEffect(() => {
    getUser().then((user) => {
      if (user.firm > 0) {
        fetchFirm(user.id, user.firm).then((firm) => {
          getRespToArrary('/api/area', '加载地区列表失败', 1, {
            enable: 1,
            level: 2,
            parentId: firm.data.province.id,
          }).then((res) => {
            setCities(res)
            getRespToArrary('/api/area', '加载地区列表失败', 1, {
              enable: 1,
              level: 3,
              parentId: firm.data.city.id,
            }).then((res) => {
              setRegions(res)
              setAreaLoading(false)
            })
          })
        })
      }
    })
  }, [firm])

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      if (!history) return
      setFirmLoading(false)
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
      return
    } else {
      setFirmLoading(true)
      getUser().then((res) => {
        setUserinfo(res)
        console.log('res.firm:', res.firm)
        if (res.firm > 0) {
          getFirm(res.id, res.firm)
          if (tag == '2') {
            setEditTitle('编辑企业信息')
          }
        } else {
          setFirmLoading(false)
          if (tag == '2') {
            setEditTitle('添加企业信息')
          }
        }
      })
    }
  }, [tag])

  const getFirm = async (userid: string, firmid: string) => {
    try {
      const res = await fetchFirm(userid, firmid)
      if (res.success) {
        setFirm(res.data)
        setFirmLoading(false)
      }
    } catch (error) {
      setFirmLoading(false)
      message.error(error.data.msg || '加载职位详情失败，服务器连接异常')
    }
  }

  return (
    <>
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard layout="left" bordered>
          <Link to="/user/account">返回个人主页</Link>
        </ProCard>
      </ProCard>
      <Card title="我的企业">
        <Row gutter={[6, 6]} justify="center">
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            {userinfo.firm == '0' && <>您还没有入驻企业，请先入驻吧！</>}
            {userinfo.firm > '0' && (
              <ProCard
                layout="center"
                hoverable
                bordered
                style={{ background: '#4492d2' }}
                onClick={() => setTag(1)}
              >
                <span className="font-size">企业详情</span>
              </ProCard>
            )}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            {userinfo.firm == '0' && (
              <ProCard
                layout="center"
                style={{ background: '#5ab5e6' }}
                hoverable
                bordered
                onClick={() => setTag(2)}
              >
                <span className="font-size">企业入驻</span>
              </ProCard>
            )}
            {userinfo.firm > '0' && (
              <ProCard
                layout="center"
                style={{ background: '#5ab5e6' }}
                hoverable
                bordered
                onClick={() => {
                  if (!areaLoading) {
                    setTag(2)
                  }
                }}
              >
                <span className="font-size">编辑企业</span>
              </ProCard>
            )}
          </Col>
        </Row>
      </Card>

      <Row>
        {tag == 1 && firmLoading && (
          <Col span={24}>
            <Card title="企业详情" loading={firmLoading}></Card>
          </Col>
        )}

        {tag == 1 && userinfo.firm > 0 && !firmLoading && (
          <Col span={24}>
            <FirmInfo firm={firm} userinfo={userinfo} from="admin" />
          </Col>
        )}
      </Row>

      {!firmLoading && tag == 2 && (
        <Row>
          <Col span={24}>
            <Card title={editTitle}>
              <FirmForm
                formItemLayout={formItemLayout}
                firm={firm}
                firmNature={firmNature}
                firmScale={firmScale}
                firmIndustry={firmIndustry}
                provinces={provinces}
                cities={cities}
                regions={regions}
                setTag={setTag}
              />
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default MyFirm
