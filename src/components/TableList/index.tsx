import React, {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { PaginationProps, Table } from '@arco-design/web-react';
import { ColumnsInterface } from './types';
import { SorterResult } from '@arco-design/web-react/es/Table/interface';
import { TableListRef } from './types';

let paginationAsync = {
  pageSize: 10,
  page: 1,
};
const TableList: ForwardRefRenderFunction<TableListRef, ColumnsInterface> = (
  props,
  ref
) => {
  const { columns, pagination, request, scroll } = props;
  console.log(columns);

  const [list, setList] = useState([]);
  const [tablePageSize, setTablePageSize] = useState({
    pageSize: 10,
    page: 1,
  });
  const [total, setTotal] = useState(10);
  const getList = async (
    searchProps = { search: '', blockchain: '', follower: 0 }
  ) => {
    console.log(searchProps);

    try {
      const { data } = await request({
        page: paginationAsync.page,
        pageSize: paginationAsync.pageSize,
        search: searchProps?.search ? searchProps?.search : '',
        blockchain: searchProps?.blockchain ? searchProps?.blockchain : '',
        follower: searchProps?.follower ? searchProps?.follower : 0,
      });
      setList(data?.rows);
      setTotal(data?.total);
    } catch (error) {}
  };
  const onChange = (page) => {
    console.log(page);

    const newPagination = {
      ...paginationAsync,
      page,
    };
    paginationAsync = newPagination;
    setTablePageSize(newPagination);
    getList();
  };

  function itemRender(page, type, originElement) {
    if (type === 'prev') {
      return (
        <a style={{ fontSize: 14, margin: '0 8px', fontWeight: 400 }}>
          Previous
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a style={{ fontSize: 14, margin: '0 8px', fontWeight: 400 }}>Next</a>
      );
    }
    return originElement;
  }

  useImperativeHandle<any, TableListRef>(ref, () => ({
    getList,
  }));
  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        pagination={
          pagination
            ? {
                total,
                pageSize: tablePageSize.pageSize,
                current: tablePageSize.page,
                onChange,
                itemRender,
                activePageItemStyle: {
                  backgroundColor: '#2D67D5',
                  color: '#ffffff',
                },
                pageItemStyle: {
                  backgroundColor: '#232528',
                },
                showTotal: (total, range) => (
                  <span>{`Showing ${range[0]} - ${range[1]}`}</span>
                ),
              }
            : pagination
        }
        data={list}
        rowKey="id"
      />
    </div>
  );
};

export default forwardRef<TableListRef, any>(TableList);
