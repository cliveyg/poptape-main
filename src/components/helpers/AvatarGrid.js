import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import blank_avatar_groovy from '../images/avatars/blank-avatar-groovy.png'
import blank_avatar_cubist_grey from '../images/avatars/blank-avatar-cubist-grey.png'
import blank_avatar_groovy_orange from '../images/avatars/blank-avatar-groovy-orange.png'
import blank_avatar_groovy_three from '../images/avatars/blank-avatar-groovy-three.png'
import blank_avatar_groovy_too from '../images/avatars/blank-avatar-groovy-too.png'
import blank_avatar_horizontal_gradient from '../images/avatars/blank-avatar-horizontal-gradient.png'
import blank_avatar_inner_groovy from '../images/avatars/blank-avatar-inner-groovy.png'
import blank_avatar_mysterion from '../images/avatars/blank-avatar-mysterion.png'
import blank_avatar_plain_brown from '../images/avatars/blank-avatar-plain-brown.png'
import blank_avatar_plain_yellow from '../images/avatars/blank-avatar-plain-yellow.png'
import blank_avatar_plain from '../images/avatars/blank-avatar-plain.png'
import blank_avatar_psyche_angled_grey from '../images/avatars/blank-avatar-psyche-angled-grey.png'
import blank_avatar_psyche_angled from '../images/avatars/blank-avatar-psyche-angled.png'
import blank_avatar_silver_gradient from '../images/avatars/blank-avatar-silver-gradient.png'
import blank_avatar_strong_and_groovy from '../images/avatars/blank-avatar-strong-and-groovy.png'
import blank_avatar_top_of_the_pops_free from '../images/avatars/blank-avatar-top-of-the-pops-free.png'
import blank_avatar_top_of_the_pops_too from '../images/avatars/blank-avatar-top-of-the-pops-too.png'
import blank_avatar_top_of_the_pops from '../images/avatars/blank-avatar-top-of-the-pops.png'
import blank_avatar_woah_dude from '../images/avatars/blank-avatar-woah-dude.png'
import blank_avatar_woah_man from '../images/avatars/blank-avatar-woah-man.png'
import blank_avatar_woah_subtle_dude from '../images/avatars/blank-avatar-woah-subtle-dude.png'
import blank_avatar_yellowy_triangled from '../images/avatars/blank-avatar-yellowy-triangled.png'
import blank_avatar_blue_fade from '../images/avatars/blank-avatar-blue-fade.png'
import blank_avatar_blue_news from '../images/avatars/blank-avatar-blue-news.png'
import blank_avatar_dramatic_blue_cloud from '../images/avatars/blank-avatar-dramatic-blue-cloud.png'
import blank_avatar_eighties_disco from '../images/avatars/blank-avatar-eighties-disco.png'
import blank_avatar_purple_cloud from '../images/avatars/blank-avatar-purple-cloud.png'
import blank_avatar_woody_one from '../images/avatars/blank-avatar-woody-one.png'
import blank_avatar_woody_two from '../images/avatars/blank-avatar-woody-two.png'

const avatarList = [
    { 'img': blank_avatar_blue_fade,
      'name': 'blank_avatar_blue_fade' },
    { 'img': blank_avatar_blue_news,
      'name': 'blank_avatar_blue_news' },
    { 'img': blank_avatar_dramatic_blue_cloud,
      'name': 'blank_avatar_dramatic_blue_cloud' },
    { 'img': blank_avatar_eighties_disco,
      'name': 'blank_avatar_eighties_disco' },
    { 'img': blank_avatar_purple_cloud,
      'name': 'blank_avatar_purple_cloud' },
    { 'img': blank_avatar_woody_one,
      'name': 'blank_avatar_woody_one' },
    { 'img': blank_avatar_woody_two,
      'name': 'blank_avatar_woody_two' },
    { 'img': blank_avatar_groovy,
      'name': 'blank_avatar_groovy' },
    { 'img': blank_avatar_cubist_grey,
      'name': 'blank_avatar_cubist_grey' },
    { 'img': blank_avatar_groovy_orange,
      'name': 'blank_avatar_groovy_orange' },
    { 'img': blank_avatar_groovy_three,
      'name': 'blank_avatar_groovy_three' },
    { 'img': blank_avatar_groovy_too,
      'name': 'blank_avatar_groovy_too' },
    { 'img': blank_avatar_horizontal_gradient,
      'name': 'blank_avatar_horizontal_gradient' },
    { 'img': blank_avatar_inner_groovy,
      'name': 'blank_avatar_inner_groovy' },
    { 'img': blank_avatar_mysterion,
      'name': 'blank_avatar_mysterion' },
    { 'img': blank_avatar_plain_brown,
      'name': 'blank_avatar_plain_brown' },
    { 'img': blank_avatar_plain_yellow,
      'name': 'blank_avatar_plain_yellow' },
    { 'img': blank_avatar_plain,
      'name': 'blank_avatar_plain' },
    { 'img': blank_avatar_psyche_angled_grey,
      'name': 'blank_avatar_psyche_angled_grey' },
    { 'img': blank_avatar_psyche_angled,
      'name': 'blank_avatar_psyche_angled' },
    { 'img': blank_avatar_silver_gradient,
      'name': 'blank_avatar_silver_gradient' },
    { 'img': blank_avatar_strong_and_groovy,
      'name': 'blank_avatar_strong_and_groovy' },
    { 'img': blank_avatar_top_of_the_pops_free,
      'name': 'blank_avatar_top_of_the_pops_free' },
    { 'img': blank_avatar_top_of_the_pops_too,
      'name': 'blank_avatar_top_of_the_pops_too' },
    { 'img': blank_avatar_top_of_the_pops,
      'name': 'blank_avatar_top_of_the_pops' },
    { 'img': blank_avatar_woah_dude,
      'name': 'blank_avatar_woah_dude' },
    { 'img': blank_avatar_woah_man,
      'name': 'blank_avatar_woah_man' },
    { 'img': blank_avatar_woah_subtle_dude,
      'name': 'blank_avatar_woah_subtle_dude' },
    { 'img': blank_avatar_yellowy_triangled,
      'name': 'blank_avatar_yellowy_triangled' },
]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 310,
    height: 310,
  },
}));

export default function AvatarGrid(props) {
    const classes = useStyles();

    function selectTile(img) {
        if (props.selectTile) props.selectTile(img)
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={50} className={classes.gridList} cols={6}>
                {avatarList.map(tile => (
                    <GridListTile onClick={() => selectTile(tile)} key={tile.img} cols={1}>
                        <img src={tile.img} alt="" />
                    </GridListTile>
                ))}
            </GridList>
        </div>
  );
}
