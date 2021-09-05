import {Button} from "@chakra-ui/button"
import {Flex} from "@chakra-ui/layout"
import {Spinner} from "@chakra-ui/spinner"
import dynamic from "next/dynamic"
import Head from "next/head"
import {useRouter} from "next/router"
import {useState} from "react"
import {useEffect} from "react"
import {Fragment, useRef} from "react"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {useGetCategories, useGetCategoryProducts} from "../../API"
import {IFullProducts} from "../../API/interfaces"
import {Error} from "../../components"
// import BrandsContainer from "../../components/Brands/BrandsContainer"
// import MobileBrands from "../../components/Brands/MobileBrands"
import CategorySkeleton from "../../components/Skeleton/CategorySkeleton"
import {selectCurrentCategory, setCurrentCategory} from "../../redux"
// import CategoryMenu from "../../components/Category/CategoryMenu";
// import Filter from "../../components/Filter/Filter";
// import FilterTitle from "../../components/Filter/FilterTitle";
// import ProductCard from "../../components/ProductCard";

const BrandsContainer = dynamic(
	() => {
		return import("../../components/Brands/BrandsContainer")
	},
	{
		ssr: false,
		loading: () => <CategorySkeleton showCategory={true} />,
	},
)
const MobileBrands = dynamic(
	() => {
		return import("../../components/Brands/MobileBrands")
	},
	{
		ssr: false,
		loading: () => <CategorySkeleton showCategory={true} />,
	},
)
const Filter = dynamic(
	() => {
		return import("../../components/Filter/Filter")
	},
	{
		ssr: false,
		loading: () => <CategorySkeleton showCategory={true} />,
	},
)

const CategoryMenu = dynamic(
	() => {
		return import("../../components/Category/CategoryMenu")
	},
	{
		ssr: false,
		loading: () => <CategorySkeleton showCategory={true} />,
	},
)

const FilterTitle = dynamic(
	() => {
		return import("../../components/Filter/FilterTitle")
	},
	{
		ssr: false,
		loading: () => <CategorySkeleton showCategory={true} />,
	},
)

const ProductCard = dynamic(
	() => {
		return import("../../components/ProductCard")
	},
	{
		ssr: false,
		loading: () => <CategorySkeleton showCategory={true} />,
	},
)

const index = ({currentCategory, setCategory}) => {
	const router = useRouter()
	const [order, setOrder]: any = useState(router.query.order)
	// const [activeIndex, setActiveIndex] = useState(undefined)
	const containerRef = useRef(null)
	const {
		data: categories,
		error: cError,
		isLoading: isCategoryLoading,
		isError: categoriesError,
	} = useGetCategories()
	const {
		data: products,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		isLoading: isProductsLoading,
		isError: productsError,
		error: pError,
	} = useGetCategoryProducts({id: Number(router.query.id), ordering: order})

	useEffect(() => {
		setCategory({id: Number(router.query.id), name: router.query.category})
		// categories?.findIndex(({title}) => title === router.query.category) !== -1
		// 	? setActiveIndex(
		// 			categories?.findIndex(({title}) => title === router.query.category),
		// 	  )
		// 	: categories?.forEach(({category_set}, index: number) => {
		// 			if (
		// 				category_set.findIndex(
		// 					(cat) => cat.title === router.query.category,
		// 				) !== -1
		// 			) {
		// 				setActiveIndex(index)
		// 			}
		// 	  })
		// console.log("Active Index: ", activeIndex)
	}, [router.query.category, router.query.id, products, categories])

	if (categoriesError || productsError) {
		router.push("/404")
	}
	if (!categories || !products || isCategoryLoading || isProductsLoading)
		return <CategorySkeleton showCategory={true} />

	console.log("CATS:", categories)

	return (
		<Flex
			as='div'
			lang='fa'
			minH='100vh'
			overflowX='hidden'
			p={{base: "80px .5rem 2rem .5rem", md: "160px 2rem 2rem 2rem"}}
			justifyContent='flex-end'
			bgColor='bgColor'>
			<Head>
				<title>{`دسته بندی - ${router.query.category}`}</title>
				<meta
					name='description'
					content='دسته بندی و نمایش محصولات درون دسته بندی'
				/>
				<meta
					name='keywords'
					content='خرید,فروشگاه,لوازم خانه,فروشگاه آنلاین,محصولات چوبی,میز و صندلی'
				/>
				<meta property='og:title' content='دسته بندی' />
				<meta
					property='og:description'
					content='دسته بندی و نمایش محصولات درون دسته بندی'
				/>
				<meta property='og:type' content='website' />
			</Head>
			<Flex
				dir='rtl'
				flexDir='column'
				mr={{base: 0, md: "2rem"}}
				w='100%'
				justifyContent='flex-start'
				ref={containerRef}>
				<FilterTitle title={router.query.category} />
				<Flex w='100%' flexDir='row'>
					<Filter setOrder={setOrder} />
					<MobileBrands />
				</Flex>
				<Flex pb='2rem' flexWrap='wrap' w='100%' justifyItems='center'>
					{products?.pages.map((group, index) => (
						<Fragment key={index}>
							{group?.results.map(
								(
									{
										id,
										image,
										name,
										price,
										bookmarked,
										form,
										off_id,
									}: IFullProducts,
									key: number,
								) => (
									<ProductCard
										off_id={off_id}
										name={name}
										price={price}
										background_image={image}
										id={id}
										margin='1rem auto'
										key={key}
										bookmarked={bookmarked}
									/>
								),
							)}
						</Fragment>
					))}
				</Flex>
				<Button
					fontFamily='Vazir'
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage}
					color='white'
					variant='outline'
					transition='all 400ms ease-in-out'
					bgColor='btnBg'
					_hover={{
						bgColor: "btnHover",
					}}
					_focus={{
						outline: 0,
						bgColor: "btnBg",
					}}
					_active={{
						bgColor: "btnActive",
					}}>
					{isFetchingNextPage ? (
						<Spinner color='#fff' />
					) : hasNextPage ? (
						"بیشتر"
					) : (
						"محصولی برای بارگزاری وجود ندارد"
					)}
				</Button>
			</Flex>
			<Flex w='25%' display={{base: "none", md: "block"}}>
				<CategoryMenu
					activeIndex={
						categories.findIndex(
							({title}) => title === router.query.category,
						) !== -1
							? categories.findIndex(
									({title}) => title === router.query.category,
							  )
							: categories.forEach(({category_set}, index: number) => {
									return category_set.findIndex((cat) =>
										cat.title === router.query.category ? index : null,
									)
							  })
					}
					items={categories}
				/>
				<BrandsContainer />
			</Flex>
		</Flex>
	)
}

const mapStateToProps = createStructuredSelector({
	currentCategory: selectCurrentCategory,
})

const mapDispatchToProps = (dispatch) => ({
	setCategory: ({id, name}) => dispatch(setCurrentCategory({id, name})),
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
