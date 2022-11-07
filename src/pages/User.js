import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import FormDialog from '../components/FormDialog';
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import AddForm from '../components/AddForm';
import { userRegsistrationRef } from '../db/firestore.collections'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'UserName', alignRight: false },
  { id: 'firstname', label: 'First Name', alignRight: false },
  { id: 'lastname', label: 'Last Name', alignRight: false },
  { id: 'userrole', label: 'User Role', alignRight: false },
  { id: 'emailaddress', label: 'Email Address', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  console.log(a, 'list A');
  console.log(b, 'list B');
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'asc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log('array filter', array);
  console.log('comprator', comparator);
  console.log('query', query);
  const stabilizedThis = array.map((el, index) => [el.data, index]);
  console.log('stablizing this', stabilizedThis);
  stabilizedThis.sort((a, b) => {
    console.log('sort A', a);
    console.log('sort B', b);
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    // console.log(array,'query console for array');
    // console.log(_user,'query console for user');
    console.log('query', query);
    return filter(
      array,
      (_user) => _user.data.username.toLowerCase().indexOf() !== -1
      // _user.data.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  // return stabilizedThis.map((el) => el[0]);
  return stabilizedThis.map((el) => el.data);
}

export default function User() {
  const [userRegsistration, setUserRegistration] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openFormModal, setFormModal] = useState(false);
  const [openEditForm, setEditForm] = useState(false);
  // const [FormModal, setCloseFormModal] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
  //  useEffect(()=>{
  //   console.log(userRegsistration);
  // },[userRegsistration])

  function getUsers() {
    // const userRegsistrationRef = collection(db, 'UserRegistration');
    getDocs(userRegsistrationRef)
      .then((response) => {
        console.log( 'sadfasdf',response.doc);
      
        // const usersList =[];
        const users = response.docs.map((user) => ({
          data:user.data(),
          id: user.id,
        }));
        //  usersList.push(users)
        // const userReg= response.docs.forEach((user)=>{
        //   console.log(user,"userrrrrrssssss")
        //   users.push( {
        //       ...user.data(),
        //       id:user.id,
        //     })})

        setUserRegistration(users);       
        // setUserRegistration(users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleRequestSort = (event, property) => {
    console.log('property', property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked === true) {
      console.log(event.target.checked);
      const newSelecteds = userRegsistration.map((n) => console.log('user', n.data.username));
      console.log(newSelecteds, 'newselecteds');
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOpenModal = () => {
    // console.log("opened");
    setFormModal(true);
  };

  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    console.log('selected user', selectedIndex, username);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
      console.log('selecting', newSelected);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      console.log('selecting equal 0', newSelected);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      console.log('selecting length', newSelected);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      console.log('selecting great', newSelected);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event, username) => {
    console.log(event);
    console.log(username,'filterrrrrrrrrrrrrrr');
    setFilterName(event.target.value);
    setFilterName(username);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userRegsistration.length) : 0;
  // console.log(emptyRows, 'emptyRows');
  const filteredUsers = applySortFilter(userRegsistration, getComparator(order, orderBy), filterName);
  console.log('filteredUsers', filteredUsers);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
            New User
          </Button>
        </Stack>
        <FormDialog title="User Formd Data" openFormModal={openFormModal}   setFormModal={setFormModal}>
          <AddForm />
        </FormDialog>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userRegsistration.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {userRegsistration.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log('user data', row);
                  
                      const {
                        data: { username, firstname, lastname, userrole, emailaddress }
                      } = row;
                    const isItemSelected = selected.indexOf(username) !== -1;

                    return (
                      <TableRow
                        hover
                        key={row.id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, username)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={username} />
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{firstname}</TableCell>
                        <TableCell align="left">{lastname}</TableCell>
                        <TableCell align="left">{userrole}</TableCell>
                        <TableCell align="left">{emailaddress}</TableCell>
                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <UserMoreMenu/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userRegsistration.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
