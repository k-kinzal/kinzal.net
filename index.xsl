<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output
  method="xml"
  version="1.0" 
  encoding="utf-8"
  media-type="application/xhtml+xml"
  doctype-public="-//W3C//DTD XHTML 1.1//EN"
  doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"
  indent="yes"/>

<xsl:template match="/rss/channel">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" > 
  <head>
    <title><xsl:value-of select="title"/></title> 
    <link rel="alternate" type="application/rss+xml">
      <xsl:attribute name="href"><xsl:value-of select="link"/>index.xml</xsl:attribute>
    </link>
    <link rel="stylesheet" type="text/css">
      <xsl:attribute name="href"><xsl:value-of select="link"/>index.css</xsl:attribute>
    </link>
    <script type="text/javascript" src="js/jquery-1.2.6.min.js"></script>
    <script type="text/javascript" src="index.js"></script>
  </head>
  <body>
   <div id="main">
      <div id="left">
        <h2>about me</h2>
        <ul id="about"> 
          <li>name:Kinzal</li> 
          <li>mail:<xsl:value-of select="webmaster"/></li> 
        </ul>
        <h2>illustration</h2>
        <ul id="illust">
          <xsl:for-each select="item[category='illustration'][position() &lt;= 40]">
            <li>
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
            </li>
          </xsl:for-each>
        </ul>
        <h2>link</h2>
        <ul id="link">
          <xsl:for-each select="item[category='link']">
            <li>
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
            </li>
          </xsl:for-each>
        </ul>
      </div>
      <div id="right">
        <img src="images/top.jpg" alt="image" width="625" id="image"/>
      </div>
      <div id="bottom">
        <a>
          <xsl:attribute name="href"><xsl:value-of select="link"/>index.xml</xsl:attribute>
          <img src="images/b/rss.png" alt="rss"/>
        </a>
        <a href="http://www.pixiv.net/member.php?id=4181">
          <img src="images/b/pixiv.gif" alt="pixiv"/>
        </a>
      </div>
      <div id="foot">
        <a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
          <img src="images/b/banner.jpg" alt="ラクガキ屋" id="bunner" />
		</a>
          <p>http://www.kinzal.net/</p>
       </div>
    </div>
  </body> 
</html> 

</xsl:template>

</xsl:stylesheet>