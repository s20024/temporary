import React from 'react'
import JsonP from 'fetch-jsonp'
import {
  GridList,
  makeStyles,
  withStyles,
  GridListTile,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  InputBase
} from '@material-ui/core'
import './App.css'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase)

const useBar = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const useImages = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1800,
    height: 600
  }
}))

const useInput = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [
        {
          id: null,
          name: null,
          image: null,
          url: null
        }
      ],
      keyword: null,
      number: null,
      key: null,
      num: null,
      uri:
        'https://www.sysbird.jp/webapi/?format=jsonp&apikey=guest&max=30&keyword=チョコ'
    }
    this.uri = 'https://www.sysbird.jp/webapi/?format=jsonp&apikey=guest'
  }

  componentDidMount () {
    this.getData(this.state.uri)
  }

  async getData (URI) {
    const data = await JsonP(this.state.uri)
      .then(res => res.json())
      .then(json => json.item)
    if (this.JudgeItems(data)) {
      this.setState({ items: data })
    } else {
      alert('検索結果がありませんでした。')
    }
  }

  render () {
    return (
      <div>
        <ViewBar />
        <div>検索ワード:デフォルトはチョコ</div>
        <div className='input'>
          <GetKeyword onChange={this.handleIn.bind(this)} />
        </div>
        <div>検索数:デフォルトは30</div>
        <div className='input'>
          <Getnumber onChange={this.handleNumberIn.bind(this)} />
        </div>
        <div className='submit'>
          <GetKeywordSubmit submit={test => this.handleSubmit(this.state)} />
        </div>
        <>
          <h3>検索ワード:{this.state.key}</h3>
          <h3>検索数:{this.state.num}</h3>
          検索url:{this.state.uri}
          <ViewSnacks items={this.state.items} />
        </>
      </div>
    )
  }

  handleIn (event) {
    const key = event.target.value
    const keykey = '&keyword=' + key
    this.setState({
      keyword: keykey,
      uri: this.uri + keykey + this.state.number,
      key: key
    })
  }

  handleNumberIn (event) {
    const num = event.target.value
    const numkey = '&max=' + num
    this.setState({
      number: numkey,
      uri: this.uri + numkey + this.state.keyword,
      num: num
    })
  }

  handleSubmit (props) {
    this.setState({ uri: this.uri + props.keyword + props.number })
    this.componentDidMount()
  }

  JudgeItems (items) {
    try {
      console.log(items[0].id)
    } catch {
      return false
    }
    return true
  }
}

const GetKeyword = props => {
  const classes = useInput()
  return (
    <FormControl className={classes.margin}>
      <InputLabel htmlFor='demo-customized-textbox'>�索ワード</InputLabel>
      <BootstrapInput
        id='demo-customized-textbox'
        type='text'
        onChange={props.onChange}
      />
    </FormControl>
  )
}

const Getnumber = props => {
  const classes = useInput()
  return (
    <FormControl className={classes.margin}>
      <InputLabel htmlFor='demo-customized-textbox'>検索ワード</InputLabel>
      <BootstrapInput
        id='demo-customized-textbox'
        type='text'
        onChange={props.onChange}
      />
    </FormControl>
  )
}

const GetKeywordSubmit = props => {
  return (
    <Button variant='contained' color='primary' onClick={() => props.submit()}>
      検索開始
    </Button>
  )
}

const ViewBar = props => {
  const classes = useBar()
  return (
    <div>
      <AppBar position='Static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            お菓子検索キット
          </Typography>
          <Button color='inherit'>s20024</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const ViewSnacks = props => {
  const classes = useImages()
  return (
    <div className={classes.root} id='images'>
      <GridList cellHeight={200} className={classes.gridList} cols={6}>
        {props.items.map((v, i) => (
          <GridListTile key={v.image} cols={Whichsize(v.image)}>
            <a href={v.url} key={i}>
              <img src={v.image} alt={v.name} height='100%' />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

const Whichsize = props => {
  let path = props
  let element = new Image()

  element.onload = function () {
    let width = element.naturalWidth
    let height = element.naturalHeight
  }
  element.src = path
  if (element.height * 1.2 < element.width) {
    return 2
  }
  return 1
}
export default App
