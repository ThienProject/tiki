import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import ShopItem from '~/components/Items/ShopItem';
import HistoryItem from '~/components/Items/HistoryItem';
import PopularSearchItem from '~/components/Items/PopularSearchItem';
import Button from '~/components/Button';
import { default as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import * as searchService from '~/apiServices/searchService';
const cx = classNames.bind(styles);
function Search() {
    /*   const [searchHistory, setSearchHistory] = useState([]);
    const [searchPopular, setSearchPopular] = useState([]); */
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debounced.trim() === '') {
            setSearchResult([]);
        } else {
            const fetchApi = async () => {
                const result = await searchService.search(debounced);
                if (result) {
                    setSearchResult(result);
                }
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    function handleOnInput() {
        setIsFocus(true);
    }
    function handleOutInput() {
        setIsFocus(false);
    }

    return (
        <div className={cx('searchbar')}>
            <div className={cx('tippy')}>
                <Tippy
                    onClickOutside={handleOutInput}
                    placement={'bottom'}
                    interactive={true}
                    visible={isFocus}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            {isFocus && (
                                <PopperWrapper>
                                    {searchValue === '' ? (
                                        <div className={cx('search-group')}>
                                            <h4 className={cx('search-title')}>History</h4>
                                            <div className={cx('history-group')}>
                                                <HistoryItem />
                                                <HistoryItem />
                                                <HistoryItem />
                                                <div className={cx('view-more')}>
                                                    <p>View More</p>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faSortDown} />
                                                </div>
                                            </div>

                                            <h4 className={cx('search-title')}>Popular Search</h4>
                                            <div className={cx('popular-group')}>
                                                <PopularSearchItem />
                                                <PopularSearchItem />
                                                <PopularSearchItem />
                                                <PopularSearchItem />
                                                <PopularSearchItem />
                                            </div>
                                        </div>
                                    ) : (
                                        searchResult.length > 0 && (
                                            <div className={cx('search-group')}>
                                                <h4 className={cx('search-title')}>Stall</h4>
                                                {searchResult.map((item, index) => {
                                                    return (
                                                        <ShopItem item={item} key={index}>
                                                            {' '}
                                                        </ShopItem>
                                                    );
                                                })}
                                            </div>
                                        )
                                    )}
                                </PopperWrapper>
                            )}
                        </div>
                    )}
                >
                    <input
                        onFocus={handleOnInput}
                        value={searchValue}
                        ref={inputRef}
                        onChange={(e) => {
                            if (!e.target.value.startsWith(' ')) {
                                setSearchValue(e.target.value);
                            }
                        }}
                        spellCheck="false"
                        placeholder="Enter a desired product, category or brand ..."
                    />
                </Tippy>
            </div>

            <Button leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />} className={cx('btn-search')}>
                Search
            </Button>
        </div>
    );
}
export default Search;
