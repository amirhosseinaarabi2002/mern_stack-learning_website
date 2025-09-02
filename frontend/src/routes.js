import Index from "./pages/Index.jsx";
import CourseInfo from "./pages/CourseInfo.jsx";
import CategoryInfo from "./pages/CategoryInfo.jsx";
import ArticleInfo from "./pages/ArticleInfo.jsx";

const routes = [
  { path: "/", element: Index },
  { path: "/course-info/:courseName", element: CourseInfo },
  { path: "/category-info/:categoryName", element: CategoryInfo },
  { path: "/article-info/:articleName", element: ArticleInfo },
];

export default routes;
