import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'

/**
 * 简易翻页插件
 * @param page 当前页码
 * @param totalPage 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationSimple = ({ page, totalPage }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const currentPage = Math.max(1, +page) // 确保页码不小于1
  const showNext = currentPage < totalPage && totalPage > 1 // 确保有下一页且总页数大于1
  const pagePrefix = router.asPath.split('?')[0].replace(/\/page\/[1-9]\d*/, '').replace(/\/$/, '')

  // 如果当前页大于总页数，不显示分页
  if (currentPage > totalPage) {
    return null
  }

  return (
    <div className="my-10 flex justify-between font-medium text-black dark:text-gray-100 space-x-2">
      {currentPage > 1 && (
        <Link
          href={{
            pathname: currentPage === 2 ? `${pagePrefix}/` : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          rel="prev"
          className="block text-center w-full duration-200 px-4 py-2 hover:border-green-500 border-b-2 hover:font-bold">
          ←{locale.PAGINATION.PREV}
        </Link>
      )}
      {!currentPage > 1 && <div className="w-full" />}
      {showNext ? (
        <Link
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          rel="next"
          className="block text-center w-full duration-200 px-4 py-2 hover:border-green-500 border-b-2 hover:font-bold">
          {locale.PAGINATION.NEXT}→
        </Link>
      ) : (
        <div className="w-full" />
      )}
    </div>
  )
}

export default PaginationSimple
