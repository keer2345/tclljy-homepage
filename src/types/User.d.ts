export interface User {
  id?: number
  username?: string
  openid?: string
  mobile?: string
  nickname?: string // 昵称
  nicknameWx?: string // 微信昵称
  avatar?: string // 头像
  avatarWx?: string // 微信头像
  email?: string
  realname?: string
  gender?: number // 用户性别 0-未知，1-男，2-女
  address?: string
  level?: number // 级别：1-个人，2-企业，3-管理员
  actor?: number // 级别：1-个人，2-企业，3-管理员
}