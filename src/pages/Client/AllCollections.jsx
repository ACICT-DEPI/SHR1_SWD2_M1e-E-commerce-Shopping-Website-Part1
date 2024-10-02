import { useState } from "react";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllCollections = () => {
  const collections = useSelector((state) => state.allCollections); // جلب البيانات
  const [first, setFirst] = useState(0); // للتحكم في بداية العرض
  const [rows, setRows] = useState(12); // عدد العناصر لكل صفحة

  // دالة لتحديث المؤشر عند تغيير الصفحة
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // دالة لعرض الكروت في الشبكة
  const displayCollections = collections
    .slice(first, first + rows)
    .map((collection) => {
      return (
        <div
          className="group w-full h-auto overflow-hidden rounded-lg relative"
          key={collection.id}
        >
          <img
            src={collection.images[0]}
            alt={collection.title}
            className="w-full h-48 object-cover object-center group-hover:opacity-75"
          />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"
          ></div>
          <div className="flex items-end p-6 absolute inset-0">
            <div>
              <h3 className="font-semibold text-lg text-white">
                <Link to={`/collection/${collection.title}`}>
                  <span className="absolute inset-0"></span>
                  <span className="absolute bottom-5">{collection.title}</span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-slate-200 pt-24 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          All collections
        </h1>
      </div>
      <div className="pt-12 pb-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayCollections}
        </div>
        <div className="mt-10">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={collections.length}
            onPageChange={onPageChange}
            template="CurrentPageReport  PrevPageLink PageLinks NextPageLink"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} collections"
          />
        </div>
      </div>
    </div>
  );
};

export default AllCollections;
