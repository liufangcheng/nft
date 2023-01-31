import React, { useEffect, useState } from 'react';
import {
  Card,
  Input,
  Select,
  Button,
  Slider,
  Tag,
  Space,
  Form,
} from '@arco-design/web-react';
import { disableFollowerInterface } from './types';
import { IconSearch } from '@arco-design/web-react/icon';
import { useLocale } from '@/utils/hooks';
import styles from './index.module.less';
import form from '@arco-design/web-react/es/Form/form';
import FormItem from '@arco-design/web-react/es/Form/form-item';
import useForm from '@arco-design/web-react/es/Form/useForm';
function SearchCard(props: disableFollowerInterface) {
  const locale = useLocale();
  const [selectBlock, setSelectBlock] = useState(0);
  const [selectFollower, setSelectFollower] = useState(0);
  const [changeColor, setChangeColor] = useState(false);
  const [searchColor, setSearchColor] = useState(false);

  const [value, setValue] = useState(0);
  const [form] = useForm();

  const SearchList = () => {
    const search = form.getFieldValue('search');
    const blockchain =
      selectBlock === 1 ? 'eth' : selectBlock === 2 ? 'sol' : '';
    const follower = value;
    props.onSearch({ search, blockchain, follower });
  };
  useEffect(() => {
    if (
      selectBlock === 1 ||
      selectBlock === 2 ||
      value > 0 ||
      form.getFieldValue('search')
    ) {
      setSearchColor(true);
    } else {
      setSearchColor(false);
    }
    console.log();
  }, [selectBlock, value]);

  return (
    <div>
      <Card className={styles.searchCard} bodyStyle={{ padding: 0 }}>
        <div style={{ marginLeft: '24px', marginTop: '24px' }}>
          <div className={styles.titleDms}>{locale('dms.Discord.filter')} </div>
          <div>
            <Form form={form} className={styles.arcoForm}>
              <FormItem field="search">
                <Input
                  placeholder="Search"
                  className={
                    changeColor ? styles.searchChange : styles.searchContent
                  }
                  prefix={
                    <IconSearch style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
                  }
                  onChange={(e) => {
                    if (e) {
                      setSearchColor(true);
                    } else {
                      setSearchColor(false);
                    }
                  }}
                  onFocus={() => {
                    setChangeColor(true);
                  }}
                  onBlur={() => {
                    setChangeColor(false);
                  }}
                />
              </FormItem>
            </Form>
          </div>

          <div
            style={{ width: 272, height: 32, marginTop: '24px' }}
            className={styles.titleDms}
          >
            {locale('dms.Select.Blockchain')}
          </div>
          {/* styles.selectChange */}
          <div style={{ marginTop: '8px', gap: '8px' }} className="flex">
            <div
              className={`${styles.selectBlockchain} ${
                selectBlock == 1 ? styles.selectChange : ''
              }`}
              onClick={() => {
                console.log(selectBlock);
                if (selectBlock === 1) {
                  setSelectBlock(0);
                } else {
                  setSelectBlock(1);
                }
              }}
            >
              eth
            </div>
            <div
              className={`${styles.selectBlockchain} ${
                selectBlock == 2 ? styles.selectChange : ''
              }`}
              onClick={() => {
                console.log(selectBlock);
                if (selectBlock === 2) {
                  setSelectBlock(0);
                } else {
                  setSelectBlock(2);
                }
              }}
            >
              sol
            </div>
          </div>
          {props?.disableFollower && (
            <div>
              <div
                style={{
                  display: 'flex',
                  marginTop: '34px',
                  justifyContent: 'space-between',
                  width: '272px',
                }}
              >
                <div className={styles.titleDms}>
                  {' '}
                  {locale('dms.Discord.follower')}
                </div>
                <div
                  className={styles.reset}
                  onClick={() => {
                    form.setFieldValue('search', null);
                    setSelectBlock(0);
                    setValue(0);
                  }}
                >
                  {locale('global.RESET')}
                </div>
              </div>
              <div style={{ marginTop: '41px' }}>
                <Slider
                  value={value}
                  max={100000}
                  onChange={(e: number) => {
                    setValue(e);
                  }}
                  className={styles.slider}
                  style={{ width: '266px', marginLeft: '6px' }}
                />
              </div>
              <div>
                <div className={styles.space}>
                  <Tag
                    className={`${styles.tag} ${
                      selectFollower === 1 ? styles.selectTag : ''
                    }`}
                    onClick={() => {
                      if (selectFollower === 1) {
                        setSelectFollower(0);
                        setValue(0);
                      } else {
                        setSelectFollower(1);
                        setValue(10000);
                      }
                    }}
                  >
                    {'>10000'}
                  </Tag>
                  <Tag
                    className={`${styles.tag} ${
                      selectFollower === 2 ? styles.selectTag : ''
                    }`}
                    onClick={() => {
                      if (selectFollower === 2) {
                        setSelectFollower(0);
                        setValue(0);
                      } else {
                        setSelectFollower(2);
                        setValue(20000);
                      }
                    }}
                  >
                    {'>20000'}
                  </Tag>
                  <Tag
                    className={`${styles.tag} ${
                      selectFollower === 3 ? styles.selectTag : ''
                    }`}
                    onClick={() => {
                      if (selectFollower === 3) {
                        setSelectFollower(0);
                        setValue(0);
                      } else {
                        setSelectFollower(3);
                        setValue(50000);
                      }
                    }}
                  >
                    {'>50000'}
                  </Tag>
                </div>
              </div>
            </div>
          )}
          <div className={styles.but}>
            <div
              className={searchColor ? styles.buttonSearch : styles.button}
              onClick={SearchList}
            >
              Search
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SearchCard;
