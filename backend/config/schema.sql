CREATE DATABASE `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`,  `username`, `updated_at`, `created_at`) VALUES
(1, 'Joao Henriques','2013-05-10 23:41:55', '2013-05-10 10:09:57'),
(2, 'John Doe', '2013-05-10 23:41:55', '2013-05-10 10:09:57');