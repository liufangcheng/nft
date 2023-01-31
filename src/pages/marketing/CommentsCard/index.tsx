import React, {
  useState,
  useRef,
  useEffect,
  FC,
  ReactNode,
  createContext,
} from 'react';
import { Card, Input, Button, Message } from '@arco-design/web-react';
import styles from './index.module.less';
import CommentSonCard from './Comments';
import { useMyStore } from '@/utils/hooks';
import LoginModal from '@/components/LoginModal';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import { CommentType } from './type';
import { commentsApi } from '@/services/comment';
export const CommentsGrandfather = createContext(null);
const CommentsCard: FC<CommentType> = ({ id }) => {
  const [inputValue, setInputValue] = useState();
  const [placeTitle, setPlaceTitle] = useState(true);
  const { state, dispatch } = useMyStore();
  const loginRef = useRef<DetailDrawerRef>();
  const { userInfo } = state;
  const [dataComments, setDataComments] = useState([]);
  const initData = async () => {
    const { data } = await commentsApi.getAllCommentsByDiscordId({ id });
    setDataComments(data.rows);
  };
  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const recursion=
  const ModalSuccess = () => {
    if (!userInfo) {
      loginRef.current.init();
      return false;
    } else {
      return true;
    }
  };
  const postComments = async () => {
    if (!userInfo) {
      loginRef.current.init();
    } else {
      try {
        await commentsApi.addComment({
          parent_id: 0,
          discord_id: id,
          user_id: userInfo.userId,
          content: inputValue,
        });
        Message.success({
          content: 'post successfully',
          className: 'message',
        });
        initData();
      } catch (error) {}
    }
  };
  const refreshData = () => {
    initData();
  };

  const getCommentsTree = (comments, level = 0) => {
    level += 1;
    if (!comments || comments?.length === 0) {
      return;
    }
    return comments.map((comment) => {
      return (
        <CommentsGrandfather.Provider key={comment.id} value={refreshData}>
          <CommentSonCard
            info={comment}
            refreshData={refreshData}
            ModalSuccess={ModalSuccess}
            level={level}
            commentsTree={getCommentsTree(comment.comments, level)}
          />
        </CommentsGrandfather.Provider>
      );
    });
  };

  useEffect(() => {
    if (userInfo) {
      setPlaceTitle(false);
    } else {
      setPlaceTitle(true);
    }
  }, [userInfo]);

  return (
    <div>
      <Card
        style={{
          // width: '1468px',
          minWidth: '750px',
          borderRadius: '0px 0px 8px 8px',
          overflow: 'hidden',
          padding: '24px',
          boxSizing: 'border-box',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.title}>{dataComments?.length} comments</div>
        <div className="mt24 flex" style={{ height: '48px', gap: '16px' }}>
          <img src="/images/11.png" alt="" />
          <Input
            style={{
              flex: 1,
              height: '48px',
              // marginLeft: '16px',
              borderRadius: '8px',
              textAlign: 'left',
            }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e);
            }}
            onFocus={(e) => {
              setPlaceTitle(false);
            }}
            onBlur={() => {
              if (!userInfo) {
                setInputValue(null);
                setPlaceTitle(true);
              }
            }}
            suffix={
              placeTitle && (
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    left: '50% ',
                    marginLeft: '-113px',
                  }}
                >
                  <div>Please</div>
                  <div
                    style={{
                      marginLeft: '5px',
                      backgroundColor: '#2D67D5',
                      padding: '0 6px',
                      borderRadius: '4px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();

                      loginRef.current.init();
                    }}
                  >
                    login
                  </div>
                  <div style={{ marginLeft: '5px' }}>to post a comment</div>
                </div>
              )
            }

            // placeholder="Please login to post a comment"
          />
          <Button
            style={{
              width: '80px',
              height: '100%',
              borderRadius: '8px',
              backgroundColor: '#2D67D5',
              display: 'block',
            }}
            onClick={postComments}
          >
            Post
          </Button>
        </div>
        <div style={{ marginTop: '32px' }}>
          {getCommentsTree(dataComments)}
          {/* {dataComments.map((item, index) => {
            return <CommentSonCard key={index} list={item}></CommentSonCard>;
          })} */}
        </div>
      </Card>
      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </div>
  );
};

export default CommentsCard;
