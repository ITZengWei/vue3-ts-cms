/** 表单列  */
export interface IPropItem {
  /** 属性名 */
  prop?: string
  /** 标签 */
  label: string
  /** 最小宽度 */
  minWith?: number | string
  /** 插槽名字 */
  slotName: string

  [prop: string]: any
}

/** 二次封装表格传参属性 */
export interface ITableProps {
  /** 列表数据 */
  listData?: any[]
  /** 列表总数 */
  listCount?: any
  /** 表格展示的所有列 */
  propList: IPropItem[]
  /** 表格标题 */
  title?: any
  /** 是否展示索引列表 */
  showIndexColumn?: boolean
  /** 是否展示选择项 */
  showSelectColumn?: boolean
  /** 是否展示表格脚部 */
  showFooter?: boolean
  /** 分页配置 */
  page?: any
  childrenProps?: any
}
