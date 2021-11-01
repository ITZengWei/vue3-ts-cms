import { useStore } from '@/store'

/**
 * 获取按钮所属权限
 * @param pageName 页面名称
 * @param handleName 操作类型 create、delete、update、query
 * @returns { Boolean } true
 */
export default function usePermission(
  pageName: string,
  handleName: 'create' | 'delete' | 'update' | 'query',
) {
  const store = useStore()
  /** 用户所属权限 */
  const permissions = store.state.login.permissions

  /** 校验权限名称 module:page:actionBtn */
  const verifyPermission = `system:${pageName}:${handleName}`

  // console.log(permissions, verifyPermission)
  return permissions.includes(verifyPermission)
}
